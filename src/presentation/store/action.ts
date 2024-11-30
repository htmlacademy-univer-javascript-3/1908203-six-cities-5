import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../../domain/models/sort-type';

export const chooseCity = createAction<string>('chooseCity');

export const chooseSorting = createAction<SortType>('chooseSorting');
