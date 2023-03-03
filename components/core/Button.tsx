import styled from 'styled-components'
import LoadingSpinner from './LoadingSpinner'
import { Body } from './Typography'

interface ButtonWrapperProps {
  isLoading: boolean
}

const ButtonWrapper = styled.button<ButtonWrapperProps>`
  border: none;
  background: ${(props) => props.theme.colors.primary400};
  cursor: pointer;
  border-radius: 1.2rem;
  padding: 1.2rem 1.6rem;
  width: 100%;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  display: flex;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ isLoading }) => isLoading && 'cursor: wait;'}
`

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}

const Button = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
}: ButtonProps) => (
  <ButtonWrapper
    disabled={disabled}
    isLoading={isLoading}
    onClick={disabled || isLoading ? () => console.log('disabled') : onClick}
  >
    {isLoading && <LoadingSpinner />}
    <Body $color="neutral000">
      {isLoading ? 'Claiming your POAP' : children}
    </Body>
  </ButtonWrapper>
)

export default Button
