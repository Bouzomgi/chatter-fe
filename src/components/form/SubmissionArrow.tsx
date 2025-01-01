import arrow from '../../assets/arrow.svg'
import '../../styles/general/Arrow.scss'

type SubmissionArrowProps = {
  readonly onSubmit: () => void
  readonly isArrowShaking?: boolean
  readonly isSelected?: boolean
}

export default function SubmissionArrow({
  onSubmit,
  isArrowShaking = false,
  isSelected = false
}: SubmissionArrowProps) {
  return (
    <button onClick={onSubmit} data-cy='submit'>
      <img
        className={
          'submission-arrow' +
          (isArrowShaking ? ' shake' : '') +
          (isSelected ? ' selected' : '')
        }
        src={arrow}
        alt='submission arrow'
      />
    </button>
  )
}
