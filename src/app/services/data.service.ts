import { Injectable } from '@angular/core';
import { CountryI, CityI } from '../model/paises.interface';

@Injectable()

export class DataService {
  private countries: CountryI[]=[
    {
      id:1,
      name: 'Brazil'
    },
    {
      id:2,
      name: 'Espania'
    },
    {
      id:3,
      name:'Peru'
    },
    {
      id:4,
      name: 'Argentina'
    },
    {
      id:5,
      name:'Republica Dominicanas'
    }
  ]

  private cities: CityI[] = [
    {
      id:1,
      country:1,
      name:'Sao Paulo'
    },
    {
      id:2,
      country:1,
      name:'Rio de Janeiro'
    },
    {
      id:3,
      country:2,
      name:'Madrid'
    },
    {
      id:4,
      country:2,
      name:'Barcelona'
    },
    {
      id:5,
      country:3,
      name:'Machu Pichu'
    },
    {
      id:6,
      country:4,
      name:'Buenos Aires'
    },
    {
      id:7,
      country:5,
      name:'Trujillo'
    }
  ]
  
  getCountries(): CountryI[]{
    return this.countries;
  }
  getCities(): CityI[]{
    return this.cities;
  }
}
