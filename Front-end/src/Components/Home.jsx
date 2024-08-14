import React from "react";
import ElectionCharts from "../pages/home/ElectionCharts";

const Home = () => {
  return (
    <div
      className="flex-1 p-6 bg-background rounded-lg shadow-md ml-4 overflow-auto"
      style={{ direction: "rtl" }}
    >
      <h1 className="text-2xl font-bold text-right">
        نسبة المشاركة في التصويت
      </h1>
      <p className="text-muted-foreground text-right">
        مراقبة مشاركة الناخبين ومشاركتهم عبر مختلف المناطق والفئات السكانية.
      </p>
      <button className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded">
        عرض التفاصيل
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-card p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-right">هذه الانتخابات</h2>
          <p className="text-3xl font-bold text-right">72%</p>
          <p className="text-muted-foreground text-sm text-right">
            +5% من الانتخابات السابقة
          </p>
          <div className="bg-muted h-2 rounded mt-2">
            <div className="bg-primary h-full w-5/6 rounded"></div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-right">
            الناخبون المسجلون
          </h2>
          <p className="text-3xl font-bold text-right">1.2M</p>
          <p className="text-muted-foreground text-sm text-right">
            +10% من الانتخابات السابقة
          </p>
          <div className="bg-muted h-2 rounded mt-2">
            <div className="bg-primary h-full w-10/12 rounded"></div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-right">ملخص الانتخابات</h2>
        <table className="min-w-full mt-4 border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-right">المؤشر</th>
              <th className="p-2 text-right">القيمة</th>
              <th className="p-2 text-right">الاتجاه</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b border-border text-right">
                نسبة المشاركة
              </td>
              <td className="p-2 border-b border-border text-right">72%</td>
              <td className="p-2 border-b border-border text-right">+5%</td>
            </tr>
            <tr>
              <td className="p-2 border-b border-border text-right">
                الناخبون المسجلون
              </td>
              <td className="p-2 border-b border-border text-right">1.2M</td>
              <td className="p-2 border-b border-border text-right">+10%</td>
            </tr>
            <tr>
              <td className="p-2 border-b border-border text-right">
                محطات الاقتراع
              </td>
              <td className="p-2 border-b border-border text-right">3,450</td>
              <td className="p-2 border-b border-border text-right">+2%</td>
            </tr>
            <tr>
              <td className="p-2 border-b border-border text-right">
                المرشحون
              </td>
              <td className="p-2 border-b border-border text-right">24</td>
              <td className="p-2 border-b border-border text-right">+4</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ElectionCharts />
    </div>
  );
};

export default Home;
