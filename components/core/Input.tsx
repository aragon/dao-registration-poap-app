import styled from 'styled-components'

const Input = styled.input`
  padding: 1.2rem 0.8rem 1.2rem 1.6rem;
  gap: 1.2rem;
  background: ${(props) => props.theme.colors.neutral000};
  border: 0.1rem solid ${(props) => props.theme.colors.neutral100};
  border-radius: 1.2rem;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${(props) => props.theme.colors.neutral500};
  width: 100%;
`

export default Input
