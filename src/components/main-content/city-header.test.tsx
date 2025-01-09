import { screen } from '@testing-library/react';
import { CityHeader } from './city-header';
import { makeFakeCities } from '../../utils/mocks';
import { renderWithProvider } from '../../utils/mock-component';

describe('CityHeader Component', () => {
  it('should render city header', () => {
    const mockCities = makeFakeCities();

    renderWithProvider(
      <CityHeader
        city={mockCities[0]}
        cities={mockCities}
        onCityClicked={() => { }}
      />
    );

    mockCities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });
});
