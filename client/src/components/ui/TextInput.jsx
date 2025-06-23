import React from "react";

export default function TextInput({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    helperText,
    autoComplete
}) {
    return (
        <div className='mb-4'>
            <label
                htmlFor={name}
                className='block text-sm font-medium text-gray-700'
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
            {helperText && (
                <p className='mt-1 text-xs text-gray-600'>{helperText}</p>
            )}
        </div>
    );
}
