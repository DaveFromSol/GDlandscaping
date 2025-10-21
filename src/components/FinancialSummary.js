import React from 'react';

const FinancialSummary = ({ jobs }) => {
  const employees = [
    { id: 1, name: 'Mike Rodriguez', hourlyRate: 25 },
    { id: 2, name: 'Sarah Johnson', hourlyRate: 22 },
    { id: 3, name: 'Tom Wilson', hourlyRate: 20 },
    { id: 4, name: 'Lisa Chen', hourlyRate: 28 }
  ];
  
  const completedJobs = jobs.filter(job => job.status === 'completed');
  
  const totals = completedJobs.reduce((acc, job) => {
    const laborCosts = job.laborAssignments.reduce((sum, labor) => sum + labor.paidAmount, 0);
    const profit = job.revenue - job.materialCosts - laborCosts;
    
    return {
      revenue: acc.revenue + job.revenue,
      materialCosts: acc.materialCosts + job.materialCosts,
      laborCosts: acc.laborCosts + laborCosts,
      profit: acc.profit + profit,
      jobCount: acc.jobCount + 1
    };
  }, { revenue: 0, materialCosts: 0, laborCosts: 0, profit: 0, jobCount: 0 });

  const avgJobValue = totals.jobCount > 0 ? totals.revenue / totals.jobCount : 0;
  const profitMargin = totals.revenue > 0 ? (totals.profit / totals.revenue) * 100 : 0;

  return (
    <div className="financial-summary">
      <h2>Financial Overview</h2>
      <div className="summary-grid">
        <div className="summary-card revenue-card">
          <div className="summary-label">Total Revenue</div>
          <div className="summary-value">${totals.revenue.toLocaleString()}</div>
          <div className="summary-subtitle">{totals.jobCount} completed jobs</div>
        </div>
        
        <div className="summary-card expense-card">
          <div className="summary-label">Total Expenses</div>
          <div className="summary-value">${(totals.materialCosts + totals.laborCosts).toLocaleString()}</div>
          <div className="summary-breakdown">
            <span>Materials: ${totals.materialCosts.toLocaleString()}</span>
            <span>Labor: ${totals.laborCosts.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="summary-card profit-card">
          <div className="summary-label">Net Profit</div>
          <div className={`summary-value ${totals.profit >= 0 ? 'positive' : 'negative'}`}>
            ${totals.profit.toLocaleString()}
          </div>
          <div className="summary-subtitle">{profitMargin.toFixed(1)}% margin</div>
        </div>
        
        <div className="summary-card average-card">
          <div className="summary-label">Avg Job Value</div>
          <div className="summary-value">${avgJobValue.toLocaleString()}</div>
          <div className="summary-subtitle">Per completed job</div>
        </div>
      </div>
      
      <div className="employee-earnings">
        <h3>Employee Earnings Summary</h3>
        <div className="earnings-grid">
          {(() => {
            const employeeEarnings = {};
            completedJobs.forEach(job => {
              job.laborAssignments.forEach(labor => {
                if (!employeeEarnings[labor.employeeId]) {
                  employeeEarnings[labor.employeeId] = {
                    totalEarnings: 0,
                    totalHours: 0,
                    jobCount: 0
                  };
                }
                employeeEarnings[labor.employeeId].totalEarnings += labor.paidAmount;
                employeeEarnings[labor.employeeId].totalHours += labor.hours;
                employeeEarnings[labor.employeeId].jobCount += 1;
              });
            });
            
            return Object.entries(employeeEarnings).map(([employeeId, earnings]) => {
              const employee = employees.find(emp => emp.id === parseInt(employeeId));
              const avgHourlyRate = earnings.totalHours > 0 ? earnings.totalEarnings / earnings.totalHours : 0;
              
              return (
                <div key={employeeId} className="earnings-card">
                  <div className="employee-name">{employee ? employee.name : `Employee ID: ${employeeId}`}</div>
                  <div className="earnings-amount">${earnings.totalEarnings.toLocaleString()}</div>
                  <div className="earnings-details">
                    <span>{earnings.totalHours}h total</span>
                    <span>${avgHourlyRate.toFixed(2)}/hr avg</span>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;