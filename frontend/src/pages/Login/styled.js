import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Title = styled.h1`
    background: red;
    small {
        font-size: 14px;
    }
`;

export const Form = styled.form`
    align-items: center;
    @media screen and (max-width: 800px){
        max-width: 40vw;
    }

`;
