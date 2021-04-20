import React, {useState} from 'react'
import cart from '../../store/auth/cart/reducer';

export function useLocalStorage (key, initialvalue) {
    const [storedValue, setStoredValue] = useState (() => {
        try{
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item): initialvalue

        }catch (error){
            return initialvalue
        }

    });

    const setValue = value => {
        try{
            setStoredValue(value)
            localStorage.setItem(key, JSON.stringify(value))

        }catch (error){
            console.error(err);
        }
        
        return [storedValue, setValue]
    }
}