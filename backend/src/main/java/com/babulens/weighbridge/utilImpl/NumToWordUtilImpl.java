package com.babulens.weighbridge.utilImpl;

import com.babulens.weighbridge.util.NumToWordUtil;
import org.springframework.stereotype.Service;

@Service
public class NumToWordUtilImpl implements NumToWordUtil {
    private final String[] units = {
            "",
            " One",
            " Two",
            " Three",
            " Four",
            " Five",
            " Six",
            " Seven",
            " Eight",
            " Nine"
    };
    private final String[] twoDigits = {
            " Ten",
            " Eleven",
            " Twelve",
            " Thirteen",
            " Fourteen",
            " Fifteen",
            " Sixteen",
            " Seventeen",
            " Eighteen",
            " Nineteen"
    };
    private final String[] tenMultiples = {
            "",
            "",
            " Twenty",
            " Thirty",
            " Forty",
            " Fifty",
            " Sixty",
            " Seventy",
            " Eighty",
            " Ninety"
    };
    private final String[] placeValues = {
            "",
            " Thousand",
            " Lakh",
            " Crore",
    };

    @Override
    public String convertNumber(long number) {
        String word = "";
        int index = 0;
        boolean firstIteration = true;
        int divisor;
        do {
            divisor = firstIteration ? 1000 : 100;
            int num = (int) (number % divisor);
            if (num != 0) {
                String str = ConversionForUptoThreeDigits(num);
                word = str + placeValues[index] + word;
            }
            index++;
            number = number / divisor;
            firstIteration = false;
        } while (number > 0);
        return word;
    }

    private String ConversionForUptoThreeDigits(int number) {
        String word = "";
        int num = number % 100;
        if (num < 10) {
            word = word + units[num];
        } else if (num < 20) {
            word = word + twoDigits[num % 10];
        } else {
            word = tenMultiples[num / 10] + units[num % 10];
        }

        word = (number / 100 > 0) ? units[number / 100] + " hundred" + word : word;
        return word;
    }

}