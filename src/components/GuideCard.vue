<template>
  <a :href="link" class="card" target="_blank">
    <!-- Guide Image -->
    <img :src="imageSrc" alt="Guide Image" class="card-img" />
    
    <!-- Card Content -->
    <div class="card-content">
      <p class="category">{{ $t(category) }}</p>
      <h3 class="title">{{ $t(title) }}</h3>
      <p class="date">{{ date }}</p>
      <p class="description">{{ $t(description) }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    imageSrc: String,
    category: String, // Receive as keys for $t()
    title: String,
    date: String,
    description: String,
    link: String // Receive the link as a prop
  }
};
</script>

<style scoped>
.card {
  display: block;
  text-decoration: none;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  color: inherit;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.category {
  font-size: 0.9rem;
  color: #777;
}

.title {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 10px 0;
}

.date {
  font-size: 0.9rem;
  color: #bbb;
}

.description {
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
}
</style>
