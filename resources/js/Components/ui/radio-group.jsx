import React from "react";

export function RadioGroup({
    value,
    onValueChange,
    children,
    className = "",
    ...props
}) {
    return (
        <div role="radiogroup" className={className} {...props}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    checked: child.props.value === value,
                    onChange: () => onValueChange(child.props.value),
                })
            )}
        </div>
    );
}

export function RadioGroupItem({
    value,
    id,
    checked,
    onChange,
    children,
    ...props
}) {
    return (
        <label htmlFor={id} className="flex items-center cursor-pointer gap-2">
            <input
                type="radio"
                id={id}
                value={value}
                checked={checked}
                onChange={onChange}
                className="form-radio text-primary focus:ring-primary"
                {...props}
            />
            {children}
        </label>
    );
}
