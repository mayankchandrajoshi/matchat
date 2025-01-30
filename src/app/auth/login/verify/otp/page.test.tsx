import { render, screen } from "@testing-library/react"
import Page from "./page"
import { expect, Mock, vi } from "vitest"
import { mockUseRouter } from "@/utils/client/tests/router-mock"
import { mockUseToast } from "@/utils/client/tests/useToast-mock"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { studResizeObserver } from "@/utils/client/tests/resizeobserver-mock"

vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
}))

vi.mock("@/hooks/use-toast", () => ({
    useToast: vi.fn(),
}))

vi.mock("@/components/forms/auth/OTPSubmitForm", () => ({
    default: vi.fn(),
}))

describe('OTP page', () => {
    beforeAll(() => {
        (useRouter as Mock).mockReturnValue(mockUseRouter());   
        (useToast as Mock).mockReturnValue(mockUseToast());

        studResizeObserver();
    })

    it('should render page', () => {
        render(<Page/>)
    })

    it("should render enter the otp heading",()=>{
        render(<Page/>)
        expect(screen.getByRole('heading',{ name:"Enter the OTP",level:3 })).toBeInTheDocument();
    })
})