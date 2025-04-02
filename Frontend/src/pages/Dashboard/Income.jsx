import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { toast } from "react-hot-toast";
import {useUserAuth} from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if(loading) return;
    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
        if(response.data) setIncomeData(response.data);
    } catch (error) {
    console.log("Something wnet wrong, Try again"< error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income;
    if(!source.trim()){
      toast.error("Source is required");
      return;
    }
    if(!amount || amount <= 0 || isNaN(amount)){
      toast.error("Amount should be greater than zero");
      return;
    }
    if(!date){
      toast.error("Date is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      })
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error("Error adding income");
      console.error(error);
    }

  }
  const deleteIncome = async (incomeId) => {
    console.log(incomeId);
    try {
      const response = await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(incomeId.id));

      console.log(response);

      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error("Error deleting income");
      console.error(error);
    }
  }
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME_EXCEL,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Income-${new Date().toLocaleDateString()}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Error downloading expenses");
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);



  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <IncomeList 
          transactions={incomeData}
          onDelete={(id)=>{
            setOpenDeleteAlert({
              show: true,
              data: {
                id,
              },
            });
          }}
          onDownload={handleDownloadIncomeDetails}
        />
        
        <Modal 
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        > 
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({SHOW: false, data: null})}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => {
              deleteIncome(openDeleteAlert.data);
              setOpenDeleteAlert({ SHOW: false, data: null });
            }}
          />
          </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
