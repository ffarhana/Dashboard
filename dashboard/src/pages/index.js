import DoughnutChart from "@/components/DoughnutChart";
import BarChart from "../components/BarChart";

export default function Home() {
    return (
        <div className="container">
            hi
            <div>
                <h3>Bar Chart (No Auth Key)</h3>
                <BarChart />
            </div>
            <div>
                <h3>Doughnut Chart (With API Key)</h3>
                <DoughnutChart />
            </div>

        </div>
    );
}