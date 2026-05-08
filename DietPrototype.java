import javax.swing.*;
import java.awt.*;

public class DietPrototype extends JFrame {

    CardLayout cardLayout;
    JPanel mainPanel;

    public DietPrototype() {
        setTitle("Inbody-Based Diet Recommendation System");
        setSize(900, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        cardLayout = new CardLayout();
        mainPanel = new JPanel(cardLayout);

        mainPanel.add(loginPanel(), "login");
        mainPanel.add(registerPanel(), "register");
        mainPanel.add(homePanel(), "home");
        mainPanel.add(inbodyPanel(), "inbody");
        mainPanel.add(goalPanel(), "goal");
        mainPanel.add(recommendPanel(), "recommend");
        mainPanel.add(mealRecordPanel(), "meal");
        mainPanel.add(feedbackPanel(), "feedback");
        mainPanel.add(adminPanel(), "admin");

        add(mainPanel);
        cardLayout.show(mainPanel, "login");
    }

    JPanel loginPanel() {
        JPanel panel = new JPanel(null);

        JLabel title = new JLabel("Inbody-Based Diet Recommendation System");
        title.setFont(new Font("Arial", Font.BOLD, 24));
        title.setBounds(200, 80, 600, 40);
        panel.add(title);

        JLabel idLabel = new JLabel("ID");
        idLabel.setBounds(300, 180, 100, 30);
        panel.add(idLabel);

        JTextField idField = new JTextField();
        idField.setBounds(400, 180, 200, 30);
        panel.add(idField);

        JLabel pwLabel = new JLabel("Password");
        pwLabel.setBounds(300, 230, 100, 30);
        panel.add(pwLabel);

        JPasswordField pwField = new JPasswordField();
        pwField.setBounds(400, 230, 200, 30);
        panel.add(pwField);

        JButton loginBtn = new JButton("Login");
        loginBtn.setBounds(350, 300, 100, 35);
        panel.add(loginBtn);

        JButton registerBtn = new JButton("Register");
        registerBtn.setBounds(470, 300, 120, 35);
        panel.add(registerBtn);

        loginBtn.addActionListener(e -> cardLayout.show(mainPanel, "home"));
        registerBtn.addActionListener(e -> cardLayout.show(mainPanel, "register"));

        return panel;
    }

    JPanel registerPanel() {
        JPanel panel = new JPanel(null);

        JLabel title = new JLabel("Register Page");
        title.setFont(new Font("Arial", Font.BOLD, 24));
        title.setBounds(320, 60, 300, 40);
        panel.add(title);

        addLabelAndField(panel, "ID", 250, 150);
        addLabelAndField(panel, "Password", 250, 200);
        addLabelAndField(panel, "Confirm Password", 250, 250);
        addLabelAndField(panel, "Name", 250, 300);
        addLabelAndField(panel, "E-mail", 250, 350);

        JButton registerBtn = new JButton("Complete Register");
        registerBtn.setBounds(330, 430, 220, 40);
        panel.add(registerBtn);

        JButton backBtn = new JButton("Back to Login");
        backBtn.setBounds(20, 20, 150, 30);
        panel.add(backBtn);

        registerBtn.addActionListener(e -> {
            JOptionPane.showMessageDialog(panel,
                    "Registration Completed");
            cardLayout.show(mainPanel, "login");
        });

        backBtn.addActionListener(e ->
                cardLayout.show(mainPanel, "login"));

        return panel;
    }

    JPanel homePanel() {
        JPanel panel = new JPanel(new BorderLayout());

        JLabel title = new JLabel("Main Page", SwingConstants.CENTER);
        title.setFont(new Font("Arial", Font.BOLD, 26));
        panel.add(title, BorderLayout.NORTH);

        JPanel menu = new JPanel(new GridLayout(4, 2, 20, 20));
        menu.setBorder(BorderFactory.createEmptyBorder(60, 120, 60, 120));

        JButton inbodyBtn = new JButton("Input Inbody Data");
        JButton goalBtn = new JButton("Set Health Goal");
        JButton recommendBtn = new JButton("View Diet Recommendation");
        JButton mealBtn = new JButton("Record Daily Meal");
        JButton feedbackBtn = new JButton("View Feedback");
        JButton adminBtn = new JButton("Administrator Page");

        menu.add(inbodyBtn);
        menu.add(goalBtn);
        menu.add(recommendBtn);
        menu.add(mealBtn);
        menu.add(feedbackBtn);
        menu.add(adminBtn);

        panel.add(menu, BorderLayout.CENTER);

        inbodyBtn.addActionListener(e -> cardLayout.show(mainPanel, "inbody"));
        goalBtn.addActionListener(e -> cardLayout.show(mainPanel, "goal"));
        recommendBtn.addActionListener(e -> cardLayout.show(mainPanel, "recommend"));
        mealBtn.addActionListener(e -> cardLayout.show(mainPanel, "meal"));
        feedbackBtn.addActionListener(e -> cardLayout.show(mainPanel, "feedback"));
        adminBtn.addActionListener(e -> cardLayout.show(mainPanel, "admin"));

        return panel;
    }

    JPanel inbodyPanel() {
        JPanel panel = basePanel("Input Inbody Data");

        addLabelAndField(panel, "Weight", 250, 150);
        addLabelAndField(panel, "Body Fat Rate", 250, 200);
        addLabelAndField(panel, "Muscle Mass", 250, 250);

        addBackButton(panel);
        return panel;
    }

    JPanel goalPanel() {
        JPanel panel = basePanel("Set Health Goal");

        JLabel label = new JLabel("Select Health Goal");
        label.setBounds(250, 170, 200, 30);
        panel.add(label);

        String[] goals = {"Weight Loss", "Muscle Gain", "Maintain Health"};
        JComboBox<String> combo = new JComboBox<>(goals);
        combo.setBounds(420, 170, 200, 30);
        panel.add(combo);

        addLabelAndField(panel, "Target Weight", 250, 230);

        addBackButton(panel);
        return panel;
    }

    JPanel recommendPanel() {
        JPanel panel = basePanel("View Diet Recommendation");

        JTextArea area = new JTextArea();
        area.setText(
                "Recommended Meal Plan\n\n" +
                        "Breakfast: Greek yogurt, banana, boiled egg\n" +
                        "Lunch: Chicken breast salad, brown rice\n" +
                        "Dinner: Salmon, sweet potato, vegetables\n\n" +
                        "Total Calories: 1800 kcal"
        );
        area.setBounds(220, 140, 450, 250);
        panel.add(area);

        JButton saveBtn = new JButton("Save Recommended Meal Plan");
        saveBtn.setBounds(330, 420, 250, 35);
        panel.add(saveBtn);

        addBackButton(panel);
        return panel;
    }

    JPanel mealRecordPanel() {
        JPanel panel = basePanel("Record Daily Meal");

        addLabelAndField(panel, "Meal Type", 250, 150);
        addLabelAndField(panel, "Food Name", 250, 200);
        addLabelAndField(panel, "Calories", 250, 250);

        JButton saveBtn = new JButton("Save Meal Record");
        saveBtn.setBounds(350, 330, 180, 35);
        panel.add(saveBtn);

        addBackButton(panel);
        return panel;
    }

    JPanel feedbackPanel() {
        JPanel panel = basePanel("View Feedback");

        JTextArea area = new JTextArea();
        area.setText(
                "Nutrition Feedback\n\n" +
                        "- Protein intake is appropriate.\n" +
                        "- Carbohydrate intake is slightly high.\n" +
                        "- Vegetable intake is insufficient."
        );
        area.setBounds(220, 150, 450, 250);
        panel.add(area);

        addBackButton(panel);
        return panel;
    }

    JPanel adminPanel() {
        JPanel panel = basePanel("Administrator Page");

        JButton userBtn = new JButton("Manage User Data");
        JButton dietBtn = new JButton("Manage Diet Data");
        JButton ruleBtn = new JButton("Manage Feedback Rules");

        userBtn.setBounds(320, 170, 250, 40);
        dietBtn.setBounds(320, 240, 250, 40);
        ruleBtn.setBounds(320, 310, 250, 40);

        panel.add(userBtn);
        panel.add(dietBtn);
        panel.add(ruleBtn);

        addBackButton(panel);
        return panel;
    }

    JPanel basePanel(String titleText) {
        JPanel panel = new JPanel(null);

        JLabel title = new JLabel(titleText, SwingConstants.CENTER);
        title.setFont(new Font("Arial", Font.BOLD, 24));
        title.setBounds(150, 50, 600, 40);
        panel.add(title);

        return panel;
    }

    void addLabelAndField(JPanel panel, String labelName, int x, int y) {
        JLabel label = new JLabel(labelName);
        label.setBounds(x, y, 150, 30);
        panel.add(label);

        JTextField field = new JTextField();
        field.setBounds(x + 170, y, 200, 30);
        panel.add(field);
    }

    void addBackButton(JPanel panel) {
        JButton backBtn = new JButton("Back to Main");
        backBtn.setBounds(20, 20, 130, 30);
        panel.add(backBtn);

        backBtn.addActionListener(e ->
                cardLayout.show(mainPanel, "home"));
    }

    public static void main(String[] args) {
        new DietPrototype().setVisible(true);
    }
}