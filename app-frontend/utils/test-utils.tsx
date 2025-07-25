import { render } from '@testing-library/react';
import { PrimeReactProvider } from 'primereact/api';


export function renderWithProviders(ui: React.ReactElement) {
    return render(<PrimeReactProvider>{ui}</PrimeReactProvider>);
}