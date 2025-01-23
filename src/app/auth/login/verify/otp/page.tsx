import OTPSubmitForm from "@/components/forms/OTPSubmitForm";

export default function OtpPage() {

    return (
        <div className="w-screen h-screen bg-slate-900 p-10 flex flex-col justify-center items-center">
            <div className='w-full max-w-[360px]'>
                <h3 className={`font-bold text-3xl text-center`}>
                    Enter the OTP
                </h3>
                <h4 className={` mt-2 text-center text-neutral-400`}>
                    We have sent an OTP to your number
                </h4>
                <OTPSubmitForm/>
            </div>
        </div>
    )
}