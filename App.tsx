import * as React from 'react';
import {Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export function getHourAndMinute(date: Date) {
  return date.toString().split(' ')[4].split(':').slice(0, 2).join(':');
}

export function addFourteenMinutes(date: Date) {
  return new Date(date.getTime() + 14 * 60 * 1000);
}

export function addSleepCycle(date: Date, cycleCount: number) {
  return new Date(date.getTime() + cycleCount * 90 * 60 * 1000);
}

export default function App() {
  const [currentTime, setcurrentTime] = React.useState(new Date());

  function generateWakeUpTimes() {
    const cycles = [1, 2, 3, 4, 5, 6];
    return cycles.map(cycleCount =>
      getHourAndMinute(
        addSleepCycle(addFourteenMinutes(currentTime), cycleCount),
      ),
    );
  }

  function getWakeUpTimeStyle(i: number) {
    let color = '';
    switch (i) {
      case 1:
        color = '#ae35fe';
        break;
      case 2:
        color = '#a41cfe';
        break;
      case 3:
        color = '#9263fe';
        break;
      case 4:
        color = '#7cabff';
        break;
      case 5:
        color = '#9cc0ff';
        break;
      default:
        color = '#7efed8';
        break;
    }
    return {
      fontSize: 16 * 3,
      color,
    };
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
        <ScrollView>
          <Text style={[s.text, s.title, s.spaceBottom]}>sleepyti.me</Text>
          <Text style={[s.text, s.spaceBottom, s.info]}>
            It takes the average human fourteen minutes to fall asleep.
          </Text>
          <Text style={[s.text, s.spaceBottom, s.info]}>
            If you head to bed right now, you should try to wake up at one of
            the following times:
          </Text>
          <Text style={[s.wakeUpTimesParent, s.spaceBottom]}>
            {generateWakeUpTimes().map((time, i, self) => (
              <>
                <Text style={getWakeUpTimeStyle(i + 1)}>{time}</Text>
                {i !== self.length - 1 && <Text style={s.or}> or </Text>}
              </>
            ))}
          </Text>
          <Text style={[s.advice, s.spaceBottom]}>
            A good night&apos;s sleep consists of 5-6 complete sleep cycles.
          </Text>
          <Pressable
            onPress={() => setcurrentTime(new Date())}
            style={({pressed}) => [{opacity: pressed ? 0.2 : 1}]}>
            <Text style={s.calculate}>Calculate Again</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 25, 50)',
    padding: 8,
  },
  text: {
    color: 'rgb(114, 215, 255)',
    textAlign: 'center',
  },
  title: {
    fontSize: 16 * 1.5,
    fontWeight: '300',
  },
  spaceBottom: {
    marginBottom: 20,
  },
  info: {
    fontSize: 16 * 1.4,
  },
  wakeUpTimesParent: {
    textAlign: 'center',
  },
  or: {
    fontSize: 16 * 1.4,
    color: 'rgb(114, 215, 255)',
    fontStyle: 'italic',
  },
  advice: {
    fontSize: 16 * 1.5,
    color: '#33a4ff',
    textAlign: 'center',
  },
  calculate: {
    color: '#cfbf6e',
    fontSize: 16 * 2,
    textAlign: 'center',
    marginTop: 20,
  },
});
