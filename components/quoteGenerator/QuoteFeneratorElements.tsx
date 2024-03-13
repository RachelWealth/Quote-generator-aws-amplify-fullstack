import React from 'react'
import styled from 'styled-components'
export  const GradientBackgroudCon = styled.div`
    background: linear-gradient(to right,#f3052d, #e29595);
    background-size: 400% 400%;
    animation:gradient 6s ease infinite;
    height: 100vh;
    width: 1000vw;
    @keyframes gradient{
        0%{
            background-position:0% 50%;
        }
        50%{
            background-position:100% 50%;
        }
        100%{
            background-position:0% 50%;
        }
    }
`
