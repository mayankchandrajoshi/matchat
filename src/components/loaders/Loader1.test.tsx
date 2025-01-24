import '@testing-library/jest-dom'

import { render,screen } from '@testing-library/react'
import Loader1 from './Loader1'
import { expect } from 'vitest'


describe('Loader1', () => {
    beforeAll(() => {
        render(<Loader1/>)
    })

    it('renders a loader', () => {
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
    })
})