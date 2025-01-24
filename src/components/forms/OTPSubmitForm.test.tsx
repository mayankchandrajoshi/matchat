import '@testing-library/jest-dom'

import { prettyDOM, render, screen } from '@testing-library/react'
import OTPSubmitForm from './OTPSubmitForm'
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const LOGIN_OTP = "123456"

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
})