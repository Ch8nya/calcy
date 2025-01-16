import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstOperand, setFirstOperand] = useState<number | null>(null);

  const handleNumberPress = useCallback((num: string) => {
    setDisplay((prevDisplay) => {
      if (prevDisplay === '0') {
        return num;
      } else {
        return prevDisplay + num;
      }
    });
  }, []);

  const handleOperatorPress = useCallback((op: string) => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
      setDisplay('0');
      setOperator(op);
    } else {
      calculate();
      setOperator(op);
    }
  }, [display, firstOperand]);

  const calculate = useCallback(() => {
    if (firstOperand !== null && operator !== null) {
      const secondOperand = parseFloat(display);
      let result: number;

      switch (operator) {
        case '+':
          result = firstOperand + secondOperand;
          break;
        case '-':
          result = firstOperand - secondOperand;
          break;
        case '*':
          result = firstOperand * secondOperand;
          break;
        case '/':
          result = firstOperand / secondOperand;
          break;
        default:
          return;
      }

      setDisplay(result.toString());
      setFirstOperand(null);
      setOperator(null);
    }
  }, [display, firstOperand, operator]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setOperator(null);
    setFirstOperand(null);
  }, []);

  const renderButton = useCallback((text: string, onPress: () => void, color: string = '#fff', textColor: string = '#000') => (
    <Button
      mode="contained"
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
      labelStyle={[styles.buttonText, { color: textColor }]}
    >
      {text}
    </Button>
  ), []);

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {renderButton('C', handleClear, '#ff9800', '#fff')}
        {renderButton('±', () => setDisplay((prev) => (parseFloat(prev) * -1).toString()), '#ff9800', '#fff')}
        {renderButton('%', () => setDisplay((prev) => (parseFloat(prev) / 100).toString()), '#ff9800', '#fff')}
        {renderButton('÷', () => handleOperatorPress('/'), '#ff5722', '#fff')}
        {renderButton('7', () => handleNumberPress('7'))}
        {renderButton('8', () => handleNumberPress('8'))}
        {renderButton('9', () => handleNumberPress('9'))}
        {renderButton('×', () => handleOperatorPress('*'), '#ff5722', '#fff')}
        {renderButton('4', () => handleNumberPress('4'))}
        {renderButton('5', () => handleNumberPress('5'))}
        {renderButton('6', () => handleNumberPress('6'))}
        {renderButton('-', () => handleOperatorPress('-'), '#ff5722', '#fff')}
        {renderButton('1', () => handleNumberPress('1'))}
        {renderButton('2', () => handleNumberPress('2'))}
        {renderButton('3', () => handleNumberPress('3'))}
        {renderButton('+', () => handleOperatorPress('+'), '#ff5722', '#fff')}
        {renderButton('0', () => handleNumberPress('0'), '#fff', '#000')}
        {renderButton('.', () => handleNumberPress('.'), '#fff', '#000')}
        {renderButton('=', calculate, '#4caf50', '#fff')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f5f5f5',
  },
  displayContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  displayText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    width: '23%',
    margin: '1%',
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default React.memo(Calculator);

