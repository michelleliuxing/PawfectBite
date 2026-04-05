package com.pawfectbite.server.infrastructure.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.pawfectbite.server.common.exception.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@EnableConfigurationProperties(CloudinaryProperties.class)
public class CloudinaryService {

    private static final Logger log = LoggerFactory.getLogger(CloudinaryService.class);
    private final Cloudinary cloudinary;

    public CloudinaryService(CloudinaryProperties props) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", props.cloudName(),
                "api_key", props.apiKey(),
                "api_secret", props.apiSecret(),
                "secure", true
        ));
    }

    /**
     * Uploads an image to Cloudinary under the "pawfectbite/pets" folder.
     * Returns the secure URL of the uploaded image.
     */
    public String uploadPetPhoto(MultipartFile file, String publicId) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "pawfectbite/pets",
                    "public_id", publicId,
                    "overwrite", true,
                    "resource_type", "image",
                    "transformation", "c_limit,w_800,h_800,q_auto,f_auto"
            ));
            String url = (String) result.get("secure_url");
            log.info("Uploaded pet photo: publicId={}, url={}", publicId, url);
            return url;
        } catch (IOException e) {
            log.error("Failed to upload pet photo: {}", e.getMessage());
            throw new AppException("PHOTO_UPLOAD_FAILED", "Failed to upload photo");
        }
    }

    public void deletePetPhoto(String publicId) {
        try {
            cloudinary.uploader().destroy("pawfectbite/pets/" + publicId, ObjectUtils.emptyMap());
            log.info("Deleted pet photo: publicId={}", publicId);
        } catch (IOException e) {
            log.warn("Failed to delete pet photo: {}", e.getMessage());
        }
    }
}
