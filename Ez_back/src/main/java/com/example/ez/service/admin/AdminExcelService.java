package com.example.ez.service.admin;

import com.example.ez.model.user.User;
import com.example.ez.model.enums.Role;
import com.example.ez.model.enums.Genero;
import com.example.ez.repository.user.UserRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.LocalDateTime;

@Service
public class AdminExcelService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public void uploadUsersFromExcel(MultipartFile file) throws Exception {
        try (InputStream is = file.getInputStream()) {
            XSSFWorkbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheetAt(0);
            
            // Omitir la primera fila (encabezados)
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                
                if (row == null) continue;
                
                // Leer datos del Excel
                String cedula = getCellValue(row, 0);
                String nombre = getCellValue(row, 1);
                String apellido = getCellValue(row, 2);
                String email = getCellValue(row, 3);
                String password = getCellValue(row, 4);
                String generoStr = getCellValue(row, 5);
                String roleStr = getCellValue(row, 6);
                
                // Validar que no exista el usuario
                if (userRepository.findByEmail(email).isPresent()) {
                    continue; // Saltar si ya existe
                }
                
                // Crear usuario
                User user = new User();
                user.setDocumentoUser(Long.parseLong(cedula));
                user.setNombre(nombre);
                user.setApellido(apellido);
                user.setEmail(email);
                user.setContrasena(passwordEncoder.encode(password));
                user.setGenero(Genero.valueOf(generoStr.toUpperCase()));
                user.getRoles().add(Role.valueOf(roleStr.toUpperCase()));
                user.setEstado("activo");
                
                userRepository.save(user);
            }
            
            workbook.close();
        }
    }
    
    public byte[] generateTemplateExcel() throws Exception {
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Usuarios");
        
        // Crear encabezados
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("cedula");
        headerRow.createCell(1).setCellValue("nombre");
        headerRow.createCell(2).setCellValue("apellido");
        headerRow.createCell(3).setCellValue("email");
        headerRow.createCell(4).setCellValue("password");
        headerRow.createCell(5).setCellValue("genero");
        headerRow.createCell(6).setCellValue("role");
        
        // Convertir a bytes
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        workbook.write(bos);
        workbook.close();
        
        return bos.toByteArray();
    }
    
    private String getCellValue(Row row, int cellIndex) {
        try {
            var cell = row.getCell(cellIndex);
            if (cell == null) return "";
            return cell.getStringCellValue();
        } catch (Exception e) {
            return "";
        }
    }
}
