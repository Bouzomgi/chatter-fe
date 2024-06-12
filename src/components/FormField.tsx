type FormFieldProps = {
  readonly fieldName: string
  readonly value: string
  readonly assignInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  readonly error: string
}

function FormField({ fieldName, value, assignInput, error }: FormFieldProps) {
  return (
    <div className='form-row'>
      <input
        type='text'
        id={fieldName}
        placeholder={fieldName}
        value={value}
        onChange={assignInput}
      />
      <span className='input-error'>{error}</span>
    </div>
  )
}

export default FormField
