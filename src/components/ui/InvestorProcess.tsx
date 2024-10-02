import { Timeline } from "@/components/ui/timeline";

const InvestorProcess = () => {
    const data = [
        {
            title: "Registration",
            content: (
                <div>
                    <p className="text-lg font-normal mb-8">
                        Begin your investment journey by registering on our platform. This quick and easy process
                        involves providing basic details about yourself and your financial goals. Whether you’re
                        investing a small amount or managing a larger portfolio, our registration process is designed to
                        be user-friendly, ensuring you can get started with minimal hassle. Once registered, you’ll gain
                        access to our investor resources and be ready to start exploring investment opportunities.
                    </p>
                </div>
            ),
        },
        {
            title: "Select Your Investor Profile",
            content: (
                <div>
                    <p className="text-lg font-normal mb-8">
                        After registering, you’ll be guided through the process of selecting your investor profile. This
                        step is crucial as it helps us tailor our investment offers to suit your risk tolerance,
                        investment horizon, and financial goals. Whether you’re a conservative investor looking for
                        stable returns or seeking higher gains with moderate risk, our platform will align your profile
                        with suitable investment opportunities, ensuring that you only receive offers that match your
                        preferences.
                    </p>
                </div>
            ),
        },
        {
            title: "Receive Investment Offers",
            content: (
                <div>
                    <p className="text-lg font-normal mb-8">
                        Based on your investor profile, you’ll start receiving personalized investment offers that match
                        your criteria. These offers are designed to provide you with diverse opportunities, ranging from
                        low-risk bonds with steady returns to higher-yield options with more significant growth
                        potential. Each offer is accompanied by detailed information about the underlying properties,
                        expected returns, and associated risks, allowing you to make informed decisions with confidence.
                    </p>
                </div>
            ),
        },
        {
            title: "Select an Investment",
            content: (
                <div>
                    <p className="text-lg font-normal mb-8">
                        Once you’ve reviewed the available offers, you can select the investment option that best aligns
                        with your goals. Whether you’re interested in a single property-backed bond or a diversified
                        portfolio, our platform makes it easy to invest. With just a few clicks, you can allocate your
                        funds and start building your Real Bonds portfolio. Our user-friendly interface ensures that
                        even first-time investors can navigate the process effortlessly.
                    </p>
                </div>
            ),
        },
        {
            title: "Track the Performance of Your Portfolio",
            content: (
                <div>
                    <p className="text-lg font-normal mb-8">
                        After investing, you can monitor the performance of your portfolio in real-time through our
                        dedicated exchange platform. You’ll have access to detailed analytics and reporting tools,
                        allowing you to track the growth of your investments, view property market trends, and assess
                        the overall performance of your portfolio. This transparency ensures you’re always in the loop,
                        helping you make data-driven decisions as your investments grow.
                    </p>
                </div>
            ),
        },
        {
            title: "Trade as and When It Suits You",
            content: (
                <div>
                    <p className="text-lg font-normal mb-8">
                        One of the key advantages of investing in Real Bonds is the liquidity it offers. You can buy and
                        sell bonds on the dedicated exchange platform at any time, providing you with the flexibility to
                        adjust your portfolio as market conditions change or your financial needs evolve. Whether you
                        want to cash in on gains, reallocate funds, or diversify further, our trading platform gives you
                        the freedom to manage your investments on your terms.
                    </p>
                </div>
            ),
        },
    ];
    return (
        <div className="w-full ">
            <Timeline data={data} />
        </div>
    );
};

export default InvestorProcess;
