import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export default function Dropdown({
    label,
    options,
    value,
    onChange,
    placeholder = "Select from list"
}) {
    return (
        <div className='w-full'>
            {label && (
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {label}
                </label>
            )}
            <Listbox
                value={value}
                onChange={onChange}
            >
                <div className='relative mt-1'>
                    <Listbox.Button className='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'>
                        <span
                            className={`block truncate ${
                                !value ? "text-gray-400" : ""
                            }`}
                        >
                            {options.find((opt) => opt.value === value)
                                ?.label || placeholder}
                        </span>
                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                            <ChevronUpDownIcon className='h-5 w-5 text-gray-400' />
                        </span>
                    </Listbox.Button>

                    <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.value}
                                value={option.value}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                            ? "bg-blue-100 text-blue-900"
                                            : "text-gray-900"
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                            }`}
                                        >
                                            {option.label}
                                        </span>
                                        {selected && (
                                            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600'>
                                                <CheckIcon className='h-5 w-5' />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );
}
