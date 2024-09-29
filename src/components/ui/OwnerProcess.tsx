import React from "react";
import { Timeline } from "@/components/ui/timeline";

const OwnerProcess = () => {
    const data = [
        {
            title: "Register Your Interest",
            content: (
                <div>
                    <p className=" text-lg font-normal mb-8">
                        Begin your journey by expressing your interest in equity release with KHA. You can easily
                        register online or by contacting our dedicated support team. During this initial step, we’ll
                        gather some basic information about your property and your financial goals to help us tailor the
                        process to your specific needs. This is your opportunity to learn more about how equity release
                        works and to ask any questions you may have.
                    </p>
                </div>
            ),
        },
        {
            title: "Set Your Funding Needs ",
            content: (
                <div>
                    <p className=" text-lg font-normal mb-8">
                        Once you’ve registered your interest, the next step is to define your funding needs. Whether
                        you’re looking to release a small portion of your property’s equity or a more significant
                        amount, we’ll work with you to determine the best approach. We’ll provide a detailed assessment
                        of how much equity you can release based on your property’s value and your financial goals. This
                        step ensures that you have a clear understanding of the potential funds available and how they
                        can be used to meet your objectives.
                    </p>
                </div>
            ),
        },
        {
            title: "Enter a Contract",
            content: (
                <div>
                    <p className=" text-lg font-normal mb-8">
                        After finalizing your funding needs, it’s time to enter into a formal contract. Our contracts
                        are clear and straightforward, outlining the terms of the equity release, including the fixed
                        percentage of equity being exchanged for cash. We prioritize transparency, so there are no
                        hidden fees or unexpected terms. This contract provides you with a secure and predictable
                        agreement, giving you confidence in your financial planning.
                    </p>
                </div>
            ),
        },
        {
            title: "Receive Funds",
            content: (
                <div>
                    <p className=" text-lg font-normal mb-8">
                        Once the contract is signed, the agreed-upon funds will be released to you during the agreed
                        lock-in period. You’ll have the flexibility to use these funds as you see fit—whether it’s for
                        home renovations, travel, supporting your family, or any other personal or financial goals. This
                        step marks the point where you can start enjoying the benefits of your equity release.
                    </p>
                </div>
            ),
        },
        {
            title: "Renew or End Your Contract at Expiration ",
            content: (
                <div>
                    <p className=" text-lg font-normal mb-8">
                        As the contract reaches its expiration, you’ll have the option to either terminate or renew your
                        agreement. If you choose to terminate, the equity stake that was released is settled according
                        to the terms of the contract, allowing you to close out the agreement. Alternatively, if you
                        wish to continue benefiting from the equity release, you can opt to renew the contract under
                        mutually agreed terms. This flexibility ensures that you remain in control of your financial
                        future, with options to adjust as your circumstances evolve.
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

export default OwnerProcess;
