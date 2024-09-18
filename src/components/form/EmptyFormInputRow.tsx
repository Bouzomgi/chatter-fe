import '../../styles/layout/Form.scss'

export default function EmptyFormInputRow() {
  return (
    <div className='form-input-row'>
      <input type='text' placeholder='' style={{ visibility: 'hidden' }} />
      <span className='input-error' />
    </div>
  )
}
