package com.ecommerce.india.services;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;

import com.ecommerce.india.exceptions.BadRequestException;
import com.ecommerce.india.models.User;
import com.ecommerce.india.repositories.UserRepo;
import com.ecommerce.india.security.jwt.Jwt;
import com.ecommerce.india.security.jwt.JwtActions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  BCryptPasswordEncoder encoder;

  @Autowired
  UserRepo userRepo;

  @Autowired
  JwtActions jwtActions;

  @Autowired
  JdbcTemplate jdbcTemplate;

  // @Autowired
  // OtpLimiter otpLimiter;


  public User authenticateUser(String username, String password)
      throws Exception {
    Authentication authentication = null;
    System.out.println("called out of try catch");
    try {
      authentication = authenticationManager
          .authenticate(new UsernamePasswordAuthenticationToken(username, password));
      SecurityContextHolder.getContext().setAuthentication(authentication);
      System.out.println("called");
      return userRepo.findFirstByUsername(username);
    } catch (Exception ex) {
      System.out.println("called");

      throw new BadRequestException("Invalid username or password");
    }
  }

  // public void verifyOtp(String otp, User user) throws Exception {
  // if (StringUtils.isBlank(otp) || !isValidRegex(otp, OTP_REGEX)) {
  // throw new BadRequestException("Invalid OTP");
  // }
  // if (!user.getOtp().equals(otp)) {
  // throw new BadRequestException("Incorrect OTP");
  // }
  // }

  // public void verifyCaptcha(String captcha, User user) throws Exception {
  // if (StringUtils.isBlank(captcha) || !isValidRegex(captcha, CAPTCHA_REGEX)) {
  // throw new BadRequestException("Invalid captcha");
  // }
  // if (!user.getCaptcha().equals(captcha)) {
  // throw new BadRequestException("Incorrect captcha");
  // }
  // }

  // public String assignNewCaptcha(User user) {
  // String captcha = generateCaptcha(6);
  // jdbcTemplate
  // .update("UPDATE bdr_users SET captcha = ? WHERE id = ?", captcha, user.getId());
  // return captcha;
  // }

  public String generateJwt(User user, String fp) {
    long now = System.currentTimeMillis();
    String jwt = jwtActions.generate(new Jwt(user.getUsername(), fp, now));
    jdbcTemplate.update("""
        UPDATE users SET jwt_timestamp = ? WHERE id = ?
        """, now, user.getId());
    return jwt;
  }

  // private String generateCaptcha(int captchaLength) {
  // StringBuffer captchaBuffer = new StringBuffer();
  // Random random = new Random();
  // while (captchaBuffer.length() < captchaLength) {
  // int index = random.nextInt(CAPTCHA_ALPHABET.length());
  // captchaBuffer.append(CAPTCHA_ALPHABET.charAt(index));
  // }
  // return captchaBuffer.toString();
  // }

  public BufferedImage makeCaptchaImage(String captcha) {
    int width = 200, height = 60;
    var image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
    Graphics2D graphics = image.createGraphics();
    graphics.setRenderingHint(
        RenderingHints.KEY_TEXT_ANTIALIASING,
        RenderingHints.VALUE_TEXT_ANTIALIAS_GASP);
    graphics.setComposite(AlphaComposite.Clear);
    graphics.fillRect(0, 0, width, height);
    graphics.setComposite(AlphaComposite.Src);
    graphics.setFont(FONT);
    graphics.setColor(TEXT_COLOR);
    FontMetrics metrics = graphics.getFontMetrics(FONT);
    int x = (width - metrics.stringWidth(captcha)) / 2;
    int y = ((height - metrics.getHeight()) / 2) + metrics.getAscent() - 4;
    graphics.drawString(captcha, x, y);
    return image;
  }

  private static final Font FONT =
      new Font(Font.MONOSPACED, Font.BOLD | Font.ITALIC, 50);
  private static final Color TEXT_COLOR = new Color(255, 255, 255);

}

