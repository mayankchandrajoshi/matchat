import '@testing-library/jest-dom'

import { prettyDOM, render, screen, waitFor } from '@testing-library/react'
import OTPSubmitForm from './OTPSubmitForm'
import userEvent from '@testing-library/user-event';
import { Mock, vi } from 'vitest';
import verifyLoginOTPAction from '@/actions/auth/verifyLoginOTPAction';
import { mockUseToast } from '@/utils/test/useToast-mock';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { mockUseRouter } from '@/utils/test/router-mock';

const LOGIN_OTP = "123456"

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

vi.mock('@/hooks/use-toast', () => ({
    useToast: vi.fn(),
}))

vi.mock('@/actions/auth/verifyLoginOTPAction', () => ({
    default: vi.fn(),
}));

describe("OTP Submit Form", () => {
    beforeAll(() => {
        // Mocking ResizeObserver
        const ResizeObserverMock = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
    
        vi.stubGlobal('ResizeObserver', ResizeObserverMock);
        
        // Mocking document.elementFromPoint
        document.elementFromPoint = vi.fn().mockReturnValue(null);

        (useRouter as Mock).mockReturnValue(mockUseRouter());   
        (useToast as Mock).mockReturnValue(mockUseToast()); 
    });

    it("renders an input and a button", () => {
        render(<OTPSubmitForm/>)

        const input = screen.getByTestId("input-otp")
        const button = screen.getByRole("button",{ name: /login/i })

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
    });

    it("updates input value on typing",async()=>{
        const user = userEvent.setup();
        render(<OTPSubmitForm/>)

        const input = screen.getByTestId("input-otp");
        await user.type(input, LOGIN_OTP);
        expect(input).toHaveValue(LOGIN_OTP);
    })
    
    it("disables button while verifying OTP",async()=>{
        const user = userEvent.setup();

        (verifyLoginOTPAction as Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message:"Logged in successfully" });
                }, 1000);
            });
        })

        render(<OTPSubmitForm/>)

        const input = screen.getByTestId("input-otp");
        await user.type(input, LOGIN_OTP);

        const button = screen.getByRole("button",{ name: /login/i });
        await user.click(button);

        expect(button).toBeDisabled();
    })

    it.skip("shows button loader while verifying OTP",async()=>{
        const user = userEvent.setup();

        (verifyLoginOTPAction as Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message:"Logged in successfully" });
                }, 1000);
            });
        })

        render(<OTPSubmitForm/>)

        const input = screen.getByTestId("input-otp");
        await user.type(input, LOGIN_OTP);

        const button = screen.getByRole("button",{ name: /login/i });
        await user.click(button);

        expect(button).toBeDisabled();

        const loader = screen.getByTestId("loader");
        expect(loader).toBeInTheDocument();
    })

    it.skip("enables button after verifying OTP",async()=>{
        const user = userEvent.setup();

        (verifyLoginOTPAction as Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message:"Logged in successfully" });
                }, 1000);
            });
        })

        render(<OTPSubmitForm/>)

        const input = screen.getByTestId("input-otp");
        await user.type(input, LOGIN_OTP);

        const button = screen.getByRole("button",{ name: /login/i });
        await user.click(button);

        expect(button).toBeDisabled();

        const loader = screen.getByTestId("loader");
        expect(loader).toBeInTheDocument();

        await waitFor(() => {
            expect(verifyLoginOTPAction).toHaveReturned();
        });

        await waitFor(()=>{
            expect(button).toBeEnabled();
        })

        expect(loader).not.toBeInTheDocument();
    })

    it.skip("should show success toast",async()=>{
        const user = userEvent.setup();

        (verifyLoginOTPAction as Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message:"Logged in successfully" });
                }, 1000);
            });
        })

        const toast = mockUseToast();
        (useToast as Mock).mockReturnValue(toast); 

        render(<OTPSubmitForm/>)

        const input = screen.getByTestId("input-otp");
        await user.type(input, LOGIN_OTP);

        const button = screen.getByRole("button",{ name: /login/i });
        await user.click(button);

        await waitFor(() => {
            expect(verifyLoginOTPAction).toHaveReturned();
        })

        await waitFor(() => {
            expect(toast.toast).toHaveBeenCalledWith({
                variant: "default",
                description: "Logged in successfully",
            });
        })
    })

    it.skip("should show error toast",async()=>{
        const user = userEvent.setup();

        (verifyLoginOTPAction as Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: false, message:"Invalid OTP" });
                }, 1000);
            });
        })

        const toast = mockUseToast();
        (useToast as Mock).mockReturnValue(toast); 

        render(<OTPSubmitForm/>)

        const input = screen.getByTestId("input-otp");
        await user.type(input, LOGIN_OTP);

        const button = screen.getByRole("button",{ name: /login/i });
        await user.click(button);

        await waitFor(() => {
            expect(verifyLoginOTPAction).toHaveReturned();
        })

        await waitFor(() => {
            expect(toast.toast).toHaveBeenCalledWith({
                variant: "destructive",
                description: "Invalid OTP",
            });
        })
    })

    it.skip("should redirect to /chat on verification success",async()=>{
        const user = userEvent.setup();

        (verifyLoginOTPAction as Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message:"Logged in successfully" });
                }, 1000);
            });
        })

        const router = mockUseRouter();
        (useRouter as Mock).mockReturnValue(router);

        render(<OTPSubmitForm/>)

        const input = screen.getByTestId("input-otp");
        await user.type(input, LOGIN_OTP);

        const button = screen.getByRole("button",{ name: /login/i });
        await user.click(button);

        await waitFor(() => {
            expect(verifyLoginOTPAction).toHaveReturned();
        })

        await waitFor(() => {
            expect(router.replace).toHaveBeenCalledWith("/chat");
        })
    })
})