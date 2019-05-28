<template>
  <div class="aseroids">
    <div v-for="day in days">
      <div>{{day.date}}</div>
      <div v-for="asteroid in day.asteroids">
        <span>ID</span><span>{{asteroid.id}}</span><span>Max Diameter (m)</span><span>{{asteroid.estimated_diameter.meters.estimated_diameter_max}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { AsteroidsService } from "../services/asteroids.service";

  export default {
    name: 'asteroids',
    data() {
      return {
        days: []
      }
    },
    methods: {
      getAsteroids() {
        this.asteroidsService.getFeed().then(success => {
          const data = success.data.near_earth_objects;
          const dates = Object.keys(data);
          this.days = dates.map(date => {
            return { date: date, asteroids: data[date] };
          });


          console.log('days', this.days);
        });
      }
    },
    created() {
      this.asteroidsService = new AsteroidsService();
      this.getAsteroids()
    }
  }

</script>

<style>


</style>
