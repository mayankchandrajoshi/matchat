import '@testing-library/jest-dom'

import { fireEvent, prettyDOM, render, screen, waitFor } from '@testing-library/react'
import LoginForm from './LoginForm'
import { useRouter } from 'next/navigation';
import { mockUseRouter } from '@/utils/test/router-mock';
import { useToast } from '@/hooks/use-toast'
import { mockUseToast } from '@/utils/test/useToast-mock';
import userEvent from '@testing-library/user-event'
import React from 'react';
import { sendLoginOTP } from '@/actions/auth/auth';

const  INPUT_EMAIL = "test@gmail.com";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/hooks/use-toast', () => ({
    useToast: jest.fn(),
}))

jest.mock('@/actions/auth/auth', () => ({
    sendLoginOTP: jest.fn(),
}));

describe('Login Form', () => {
    beforeAll(() => {
        (useRouter as jest.Mock).mockReturnValue(mockUseRouter());   
        (useToast as jest.Mock).mockReturnValue(mockUseToast()); 
    })

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('renders email input and send button', () => {
        render(<LoginForm/>)

        const emailInput = screen.getByPlaceholderText(/email/i);
        const button = screen.getByRole('button', { name: 'Send OTP' });

        expect(emailInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
    });

    it('updates input value on typing', async() => {  
        const user = userEvent.setup();
        render(<LoginForm/>)
    
        const emailInput = screen.getByPlaceholderText(/email/i);
        await user.type(emailInput, INPUT_EMAIL);
    
        expect(emailInput).toHaveValue(INPUT_EMAIL);
    });

    it('disables button while sending OTP', async() => {
        const user = userEvent.setup();

        (sendLoginOTP as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true });
                }, 1000);
            });
        })

        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText(/email/i);
        await user.type(emailInput, INPUT_EMAIL);

        const button = screen.getByRole('button'); 
        await user.click(button);
        
        expect(button).toBeDisabled();
    });

    it('enables button after receiving OTP', async() => {
        const user = userEvent.setup();

        const mockSendLoginOTP = sendLoginOTP as jest.Mock;

        (mockSendLoginOTP).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true,message: `OTP Sent Successfully to ${INPUT_EMAIL}` });
                }, 1000);
            });
        })

        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText(/email/i);
        await user.type(emailInput, INPUT_EMAIL);

        const button = screen.getByRole('button'); 
        await user.click(button);
        expect(button).toBeDisabled();
        
        await waitFor(() => {
            expect(mockSendLoginOTP).toHaveReturned();
        });

        await waitFor(() => {
            expect(button).toBeEnabled();
        });
    });

    it('should show error toast', async() => {
        const user = userEvent.setup();

        const mockSendLoginOTP = sendLoginOTP as jest.Mock;

        (mockSendLoginOTP).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: false, errors: { email: ['Invalid email address'] } });
                }, 1000);
            });
        })
        
        const toast = mockUseToast();
        (useToast as jest.Mock).mockReturnValue(toast); 

        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText(/email/i);
        await user.type(emailInput, 'randomGarbage');    

        const button = screen.getByRole('button'); 
        await user.click(button);

        await waitFor(() => {
            expect(mockSendLoginOTP).toHaveReturned();
        });

        await waitFor(() => {
            expect(toast.toast).toHaveBeenCalledWith({
                variant: "destructive",
                description : ['Invalid email address'],
            });
        });
    });

    it('should show success toast', async() => {
        const user = userEvent.setup();

        const mockSendLoginOTP = sendLoginOTP as jest.Mock;

        (mockSendLoginOTP).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message: `OTP Sent Successfully to ${INPUT_EMAIL}` });
                }, 1000);
            })
        })

        const toast = mockUseToast();
        (useToast as jest.Mock).mockReturnValue(toast); 

        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText(/email/i);
        await user.type(emailInput, INPUT_EMAIL);

        const button = screen.getByRole('button'); 
        await user.click(button);

        await waitFor(() => {
            expect(mockSendLoginOTP).toHaveReturned();
        });

        await waitFor(() => {
            expect(toast.toast).toHaveBeenCalledWith({
                variant: "default",
                description : `OTP Sent Successfully to ${INPUT_EMAIL}`,
            });
        });
    });

    it('should redirect to /auth/login/verify/otp on success of OTP', async() => {
        const user = userEvent.setup();
        const mockSendLoginOTP = sendLoginOTP as jest.Mock;

        (mockSendLoginOTP).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message: `OTP Sent Successfully to ${INPUT_EMAIL}` });
                }, 1000);
            })
        })

        const router = mockUseRouter();
        (useRouter as jest.Mock).mockReturnValue(router);

        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText(/email/i);
        await user.type(emailInput, INPUT_EMAIL);

        const button = screen.getByRole('button'); 
        await user.click(button);

        await waitFor(() => {
            expect(mockSendLoginOTP).toHaveReturned();
        });

        await waitFor(() => {
            expect(router.push).toHaveBeenCalledWith('/auth/login/verify/otp');
        });
    });
})