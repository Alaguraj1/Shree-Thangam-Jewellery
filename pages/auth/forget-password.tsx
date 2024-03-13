import React,{useState}  from 'react'
import ForgetMobileNumber from "./forget-mobile"
import ForgetOtp from "./forget-otp";
import ConfirmPassword from "./confirm-password"

const ForgetPassword = () => {

    const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");


  return (
    <div>
    {step === 1 && (
      <ForgetMobileNumber setStep={setStep} setMobileNumber={setMobileNumber} />
    )}
    {step === 2 && (
      <ForgetOtp setStep={setStep} mobileNumber={mobileNumber} />
    )}
    {step === 3 && <ConfirmPassword setStep={setStep} mobileNumber={mobileNumber} />}
  </div>
  )
}

export default ForgetPassword