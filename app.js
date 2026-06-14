const state = {
  user: {
    id: "student",
    name: "장서현",
    email: "jjsh050413@gmail.com",
  },
  inbody: {
    weight: 72,
    bodyFat: 24,
    muscleMass: 31,
    height: 168,
  },
  goal: {
    type: "Weight Loss",
    targetWeight: 65,
    activityLevel: "medium",
  },
  meals: [
    { id: 1, type: "Breakfast", food: "Greek yogurt, banana, boiled egg", calories: 430, protein: 28 },
    { id: 2, type: "Lunch", food: "Chicken breast salad, brown rice", calories: 620, protein: 42 },
  ],
  savedPlans: [],
};

const views = {
  dashboard: "Dashboard",
  inbody: "Input InBody Data",
  goal: "Set Health Goal",
  recommend: "View Diet Recommendation",
  meal: "Record Daily Meal",
  feedback: "View Feedback",
  admin: "Administrator Page",
};

const dietRules = {
  "Weight Loss": {
    calories: 1700,
    meals: [
      ["Breakfast", "Greek yogurt, banana, boiled egg", "High protein breakfast to reduce snacking."],
      ["Lunch", "Chicken breast salad, brown rice", "Balanced protein and complex carbohydrates."],
      ["Dinner", "Salmon, sweet potato, vegetables", "Moderate calories with healthy fat."],
    ],
  },
  "Muscle Gain": {
    calories: 2350,
    meals: [
      ["Breakfast", "Oatmeal, milk, eggs, nuts", "Protein and carbohydrates for training energy."],
      ["Lunch", "Beef rice bowl, vegetables", "Higher calories with iron-rich protein."],
      ["Dinner", "Chicken pasta, avocado salad", "Protein-focused dinner for recovery."],
    ],
  },
  "Maintain Health": {
    calories: 2000,
    meals: [
      ["Breakfast", "Whole grain toast, egg, fruit", "Simple balanced start."],
      ["Lunch", "Tofu bibimbap, soup", "Fiber-rich meal with plant protein."],
      ["Dinner", "Grilled fish, rice, vegetables", "Balanced nutrients with moderate calories."],
    ],
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function setAuthMode(mode) {
  const isLogin = mode === "login";
  $("#login-form").classList.toggle("hidden", !isLogin);
  $("#register-form").classList.toggle("hidden", isLogin);
  $("#login-tab").classList.toggle("active", isLogin);
  $("#register-tab").classList.toggle("active", !isLogin);
}

function enterApp() {
  $("#auth-screen").classList.add("hidden");
  $("#workspace").classList.remove("hidden");
  $("#current-user").textContent = state.user.id;
  renderAll();
}

function logout() {
  $("#workspace").classList.add("hidden");
  $("#auth-screen").classList.remove("hidden");
  setView("dashboard");
}

function setView(viewName) {
  $$(".view").forEach((view) => view.classList.remove("active"));
  $(`#${viewName}-view`).classList.add("active");
  $$(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  $("#view-title").textContent = views[viewName];
  renderAll();
}

function calculateBmi() {
  const heightMeter = state.inbody.height / 100;
  return state.inbody.weight / (heightMeter * heightMeter);
}

function getRecommendation() {
  const base = dietRules[state.goal.type];
  let calories = base.calories;

  if (state.inbody.bodyFat > 28 && state.goal.type === "Weight Loss") calories -= 120;
  if (state.inbody.muscleMass < 28 && state.goal.type === "Muscle Gain") calories += 160;
  if (state.goal.activityLevel === "high") calories += 180;
  if (state.goal.activityLevel === "low") calories -= 100;

  return { ...base, calories };
}

function renderPlan(target) {
  const recommendation = getRecommendation();
  target.innerHTML = recommendation.meals
    .map(
      ([type, food, note]) => `
        <article class="meal-card">
          <span>${type}</span>
          <strong>${food}</strong>
          <p>${note}</p>
        </article>
      `,
    )
    .join("");
}

function renderMetrics() {
  $("#metric-weight").textContent = `${state.inbody.weight} kg`;
  $("#metric-fat").textContent = `${state.inbody.bodyFat}%`;
  $("#metric-muscle").textContent = `${state.inbody.muscleMass} kg`;
  $("#metric-goal").textContent = state.goal.type;

  $("#weight").value = state.inbody.weight;
  $("#body-fat").value = state.inbody.bodyFat;
  $("#muscle-mass").value = state.inbody.muscleMass;
  $("#height").value = state.inbody.height;
  $("#goal-type").value = state.goal.type;
  $("#target-weight").value = state.goal.targetWeight;
  $("#activity-level").value = state.goal.activityLevel;
}

function renderMeals() {
  const recentMeals = state.meals.slice(-3).reverse();
  $("#recent-meals").innerHTML = recentMeals
    .map((meal) => `<li><span>${meal.type}: ${meal.food}</span><strong>${meal.calories} kcal</strong></li>`)
    .join("");

  $("#meal-history").innerHTML = state.meals
    .map(
      (meal) => `
        <li>
          <span>${meal.type}: ${meal.food}<br><small>${meal.protein}g protein</small></span>
          <strong>${meal.calories} kcal</strong>
          <button type="button" aria-label="Delete meal" data-delete-meal="${meal.id}">×</button>
        </li>
      `,
    )
    .join("");

  const totalCalories = state.meals.reduce((sum, meal) => sum + meal.calories, 0);
  $("#daily-calories").textContent = `${totalCalories} kcal`;
}

function renderRecommendation() {
  renderPlan($("#dashboard-plan"));
  renderPlan($("#recommend-plan"));

  const recommendation = getRecommendation();
  const bmi = calculateBmi();
  $("#recommend-analysis").innerHTML = `
    <h3>Analysis</h3>
    <p>BMI: ${bmi.toFixed(1)}</p>
    <p>Target calories: ${recommendation.calories} kcal</p>
    <p>Goal: ${state.goal.type}, target weight ${state.goal.targetWeight} kg.</p>
  `;
}

function renderFeedback() {
  const totalCalories = state.meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = state.meals.reduce((sum, meal) => sum + meal.protein, 0);
  const targetCalories = getRecommendation().calories;
  const feedback = [];

  if (totalCalories < targetCalories * 0.8) {
    feedback.push(["Calorie Intake", "Total calories are lower than the recommended range. Add a balanced snack or larger lunch."]);
  } else if (totalCalories > targetCalories * 1.15) {
    feedback.push(["Calorie Intake", "Total calories are above the recommended range. Reduce high-calorie snacks or sauces."]);
  } else {
    feedback.push(["Calorie Intake", "Daily calories are close to the recommended range."]);
  }

  if (totalProtein < 75) {
    feedback.push(["Protein", "Protein intake is insufficient for body composition management. Add eggs, tofu, fish, or chicken."]);
  } else {
    feedback.push(["Protein", "Protein intake is appropriate. Keep distributing protein across meals."]);
  }

  if (state.inbody.bodyFat > 28) {
    feedback.push(["Body Fat Rate", "Body fat rate is high, so the plan emphasizes lean protein and controlled carbohydrates."]);
  }

  $("#feedback-list").innerHTML = feedback
    .map(([title, text]) => `<div class="feedback-item"><strong>${title}</strong><span>${text}</span></div>`)
    .join("");
}

function renderAdmin() {
  const userRows = [
    ["User ID", state.user.id],
    ["Name", state.user.name],
    ["E-mail", state.user.email],
    ["Saved Plans", state.savedPlans.length],
    ["Meal Records", state.meals.length],
  ];

  $("#admin-user-data").innerHTML = userRows.map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`).join("");
  $("#admin-diet-data").innerHTML = Object.entries(dietRules)
    .map(([goal, rule]) => `<li>${goal}: ${rule.calories} kcal base plan</li>`)
    .join("");
  $("#admin-rules").innerHTML = [
    "High body fat lowers weight-loss calories.",
    "Low muscle mass raises muscle-gain calories.",
    "Activity level adjusts target calories.",
  ]
    .map((rule) => `<li>${rule}</li>`)
    .join("");
}

function renderAll() {
  renderMetrics();
  renderMeals();
  renderRecommendation();
  renderFeedback();
  renderAdmin();
}

$("#login-tab").addEventListener("click", () => setAuthMode("login"));
$("#register-tab").addEventListener("click", () => setAuthMode("register"));
$("#logout-button").addEventListener("click", logout);

$("#login-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = $("#login-id").value.trim() || "student";
  state.user.id = id;
  enterApp();
  showToast("Login completed");
});

$("#register-form").addEventListener("submit", (event) => {
  event.preventDefault();
  state.user = {
    id: $("#register-id").value.trim(),
    name: $("#register-name").value.trim(),
    email: $("#register-email").value.trim(),
  };
  $("#login-id").value = state.user.id;
  setAuthMode("login");
  showToast("Registration completed");
});

$$(".nav-item").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

$$("[data-view-jump]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewJump));
});

$("#inbody-form").addEventListener("submit", (event) => {
  event.preventDefault();
  state.inbody = {
    weight: Number($("#weight").value),
    bodyFat: Number($("#body-fat").value),
    muscleMass: Number($("#muscle-mass").value),
    height: Number($("#height").value),
  };
  renderAll();
  showToast("InBody data saved");
});

$("#goal-form").addEventListener("submit", (event) => {
  event.preventDefault();
  state.goal = {
    type: $("#goal-type").value,
    targetWeight: Number($("#target-weight").value),
    activityLevel: $("#activity-level").value,
  };
  renderAll();
  showToast("Health goal saved");
});

$("#meal-form").addEventListener("submit", (event) => {
  event.preventDefault();
  state.meals.push({
    id: Date.now(),
    type: $("#meal-type").value,
    food: $("#food-name").value.trim(),
    calories: Number($("#calories").value),
    protein: Number($("#protein").value),
  });
  event.target.reset();
  $("#protein").value = 20;
  renderAll();
  showToast("Meal record saved");
});

$("#meal-history").addEventListener("click", (event) => {
  const deleteId = event.target.dataset.deleteMeal;
  if (!deleteId) return;
  state.meals = state.meals.filter((meal) => meal.id !== Number(deleteId));
  renderAll();
  showToast("Meal record deleted");
});

$("#save-plan-button").addEventListener("click", () => {
  state.savedPlans.push({
    id: Date.now(),
    goal: state.goal.type,
    calories: getRecommendation().calories,
  });
  renderAdmin();
  showToast("Recommended meal plan saved");
});

renderAll();
