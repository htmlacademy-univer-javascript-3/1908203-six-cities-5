import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State } from '../types/state';
import { AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
