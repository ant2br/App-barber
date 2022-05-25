import React from "react";
import styled from "styled-components/native";
import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';

const StarArea = styled.View`
    flex-direction: row;
`;

const Star = styled.View``;

const StarText = styled.Text`
   font-size: 12px;
   font-weight: bold;
   margin-left: 5px;
   color: #737373;
`;

export default ({ stars, showNumber }) => {
    const starsArray = [0, 0, 0, 0, 0];
    let floor = Math.floor(stars)
    let left = stars - floor;
    for (let i = 0; i < floor; i++) {
        starsArray[i] = 2;
    }
    if (left > 0) {
        starsArray[floor] = 1;
    }
    
    console.log(starsArray)

    return (
        <StarArea>
            {starsArray.map((star, index) => (
                <Star key={index}>
                    {star === 0 && <StarEmpty width="18" height="18" fill="#FF9200" />}
                    {star === 1 && <StarHalf width="18" height="18" fill="#FF9200" />}
                    {star === 2 && <StarFull width="18" height="18" fill="#FF9200" />}
                </Star>
            ))}
            
            {showNumber && <StarText>{stars}</StarText>}

        </StarArea>
    )
}