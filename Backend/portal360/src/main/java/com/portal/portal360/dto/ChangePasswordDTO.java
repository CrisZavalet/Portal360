package com.portal.portal360.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDTO {

    private String currentPassword;

    private String newPassword;

    private String confirmPassword;
}

/*

{
  "currentPassword": "Temporal2026!",
  "newPassword": "NuevaClave2026!",
  "confirmPassword": "NuevaClave2026!"
}

*/