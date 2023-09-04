import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class VulnerableCode {

    public static void main(String[] args) {
        String username = "maliciousUser'; DROP TABLE users;";
        String password = "password";

        try {
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/mydb", "root", "root");
            String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setString(1, username);
            statement.setString(2, password);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                System.out.println("Logged in as: " + resultSet.getString("username"));
            }

            resultSet.close();
            statement.close();
            conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
