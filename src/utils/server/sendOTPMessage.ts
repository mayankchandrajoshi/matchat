"use server"

import * as SibApiV3Sdk from 'sib-api-v3-typescript'

export default async (email: string, otp: string) => {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_OTP_API_KEY!);

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 

    sendSmtpEmail.subject = "Signin OTP from MatChat";
    sendSmtpEmail.htmlContent = `<html><body><h1>Your OTP Code is: <strong>${otp}</strong></h1><p>Please use this code to verify your email address.</p></body></html>`;
    sendSmtpEmail.sender = {"name":"MatChat","email":process.env.BRAVO_SENDER_EMAIL!};
    sendSmtpEmail.to = [{"email":email}];
    sendSmtpEmail.headers = { "Custom-Header": "OTP Verification" };

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
}