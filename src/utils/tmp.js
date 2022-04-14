export default function(htmlCode,jsCode) {
  return `<template>
  ${htmlCode}
</template>

<script>
export default {
  data() {
    return {
      ${jsCode}
    };
  },
  methods: {
  
  }
};
</script>
`;
}
