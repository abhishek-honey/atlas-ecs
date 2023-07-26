exports = async function () {

  context.functions.execute('atlas_unpause_cluster');

  // periodically call the atlas_check_cluster_status_pause_or_unpause function and check if status is true
  let counter = 0;

  const response = context.functions.execute('atlas_check_cluster_status_pause_or_unpause');

  while (true) {
    // Your code inside the loop goes here
    console.log('Loop iteration:', counter);

    // Increment the counter
    counter++;
    const response = context.functions.execute('atlas_check_cluster_status_pause_or_unpause');
    console.log(response);

    if (response.paused === true) {
      console.log("paused is true");
    } else {
      console.log("paused is false");
      break;
    }
  }

  context.functions.execute('ecs_get_desired_count');
  return "success";
};
