import React from "react";
import classnames from "classnames";

const SelectFieldGroup = ({
  field,
  value,
  label,
  error,
  onChange,
  collection
}) => {
  return (
    <div className={classnames("form-group", { "has-error": error })}>
      <label className="control-label">{label}</label>
      <select
        onChange={onChange}
        value={value}
        name={field}
        className="form-control"
      >
        {collection.list ? (
          <span>
            {collection.map(field => (
              <option key={field._id} value={field.name}>
                {field.name}
              </option>
            ))}
          </span>
        ) : (
          <option value="null">No current categories</option>
        )}
      </select>
    </div>
  );
};

export default SelectFieldGroup;
