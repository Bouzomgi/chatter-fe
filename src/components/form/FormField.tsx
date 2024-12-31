type FormFieldProps = {
  readonly fieldName: string
  readonly value: string
  readonly assignInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  readonly error: string
  readonly dataCy?: string
}

function FormField({
  fieldName,
  value,
  assignInput,
  error,
  dataCy
}: FormFieldProps) {
  return (
    <div className='form-input-row' data-cy={dataCy}>
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
