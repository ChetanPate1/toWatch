<template lang="html">
  <div class="countdown-timer">
    <span class="time">
        {{ counter.d.val }} <i>{{ counter.d.name }}</i>
    </span>
    <div class="time">
        {{ counter.h.val }} <i>{{ counter.h.name }}</i>
    </div>
    <div class="time">
        {{ counter.m.val }} <i>{{ counter.m.name }}</i>
    </div>
    <div class="time">
        {{ counter.s.val }} <i>{{ counter.s.name }}</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',
  props: {
    to: Number
  },
  data() {
    return {
      counter: {
        d: { val: '00', name: 'days' },
        h: { val: '00', name: 'hours' },
        m: { val: '00', name: 'mins' },
        s: { val: '00', name: 'secs' }
      },
      inSeconds: {
        now: function() {
          return new Date().getTime() / 1000;
        },
        day: 86400,
        hour: 3600,
        minute: 60
      }
    };
  },
  mounted() {
    if (this.to) {
      window.setInterval(() => {
        this.timer(this.to);
      }, 1000);
    } else {
      return this.prettifyTime([0, 0, 0, 0]);
    }
  },
  methods: {
    timer(futureDate) {
      let inSeconds = this.inSeconds;
      futureDate = futureDate / 1000;
      let delta = Math.abs(futureDate - inSeconds.now());
      if (futureDate - inSeconds.now() < 0 || !futureDate) {
        this.prettifyTime([0, 0, 0, 0]);
      }
      let days = Math.floor(delta / inSeconds.day);
      delta -= days * inSeconds.day;
      let hours = Math.floor(delta / inSeconds.hour) % inSeconds.hour;
      delta -= hours * inSeconds.hour;
      let minutes = Math.floor(delta / inSeconds.minute) % inSeconds.hour;
      delta -= minutes * inSeconds.minute;
      let seconds = Math.floor(delta);
      this.prettifyTime([days, hours, minutes, seconds]);
    },
    prettifyTime(time) {
      let prettifiedTime = {};
      let names = ['day', 'hour', 'min', 'sec'],
        i = 0;
      for (i; i < 4; i++) {
        let prop = names[i].charAt(0);
        prettifiedTime[prop] = {
          name: names[i],
          val: '0' + time[i]
        };
        if (time[i] > 1 && time[i] < 10) {
          prettifiedTime[prop] = { name: names[i] + 's', val: '0' + time[i] };
        }
        if (time[i] > 9) {
          prettifiedTime[prop] = { name: names[i] + 's', val: '' + time[i] };
        }
      }
      this.counter = prettifiedTime;
    }
  }
};
</script>
<style lang="scss" src="./countdown-timer.scss"></style>
