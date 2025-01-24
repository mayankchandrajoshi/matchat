import '@testing-library/jest-dom'

import { render, screen, waitFor, within } from '@testing-library/react'
import LoginForm from './LoginForm'
import { useRouter } from 'next/navigation';
import { mockUseRouter } from '@/utils/test/router-mock';
import { useToast } from '@/hooks/use-toast'
import { mockUseToast } from '@/utils/test/useToast-mock';
import userEvent from '@testing-library/user-event'
import React from 'react';
import { sendLoginOTP } from '@/actions/auth/auth';
import { describe, expect, Mock, vi } from 'vitest'

const  INPUT_EMAIL = "test@gmail.com";

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

vi.mock('@/hooks/use-toast', () => ({
    useToast: vi.fn(),
}))

vi.mock('@/actions/auth/auth', () => ({
    sendLoginOTP: vi.fn(),
}));

describe('Login Form', () => {
    beforeAll(() => {
        (useRouter as Mock).mockReturnValue(mockUseRouter());   
        (useToast as Mock).mockReturnValue(mockUseToast()); 
    })

    afterEach(() => {
        vi.clearAllMocks();
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

        (sendLoginOTP as Mock).mockImplementation(() => {
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

    it('shows button loader while sending OTP', async() => {
        const user = userEvent.setup();

        (sendLoginOTP as Mock).mockImplementation(() => {
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
        
        within(button).getByTestId('loader');
    });

    it('enables button after receiving OTP', async() => {
        const user = userEvent.setup();

        const mockSendLoginOTP = sendLoginOTP as Mock;

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

        const mockSendLoginOTP = sendLoginOTP as Mock;

        (mockSendLoginOTP).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: false, errors: { email: ['Invalid email address'] } });
                }, 1000);
            });
        })
        
        const toast = mockUseToast();
        (useToast as Mock).mockReturnValue(toast); 

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

        const mockSendLoginOTP = sendLoginOTP as Mock;

        (mockSendLoginOTP).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message: `OTP Sent Successfully to ${INPUT_EMAIL}` });
                }, 1000);
            })
        })

        const toast = mockUseToast();
        (useToast as Mock).mockReturnValue(toast); 

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
        const mockSendLoginOTP = sendLoginOTP as Mock;

        (mockSendLoginOTP).mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ success: true, message: `OTP Sent Successfully to ${INPUT_EMAIL}` });
                }, 1000);
            })
        })

        const router = mockUseRouter();
        (useRouter as Mock).mockReturnValue(router);

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