import { render, screen } from '@testing-library/react'
import Page from './page'
import { expect } from 'vitest'

describe('Home Page', () => {
    beforeEach(() => {
        render(<Page />)
    })

    it('renders a logo', () => {
        const logo = screen.getByRole('heading', { name: 'M', level: 1 });
        expect(logo).toBeInTheDocument()
    })

    it("renders a link to the /chats page", () => {
        const link = screen.getByRole('link', { name: "Start Chatting" });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/chats')
    })
    
})