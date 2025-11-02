import { supabase } from './config';

const BUCKET_NAME = 'blog-images';

/**
 * Upload de imagem para o Supabase Storage
 */
export async function uploadBlogImage(file: File): Promise<string | null> {
  try {
    // Gera um nome único para a imagem
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const filePath = `blog/${fileName}`;

    // Faz upload do arquivo
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Erro ao fazer upload:', error);
      return null;
    }

    // Retorna a URL pública da imagem
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Erro ao fazer upload da imagem:', err);
    return null;
  }
}

/**
 * Deleta uma imagem do Supabase Storage
 */
export async function deleteBlogImage(imageUrl: string): Promise<boolean> {
  try {
    // Extrai o caminho do arquivo da URL pública
    const urlParts = imageUrl.split('/');
    const filePath = urlParts.slice(-2).join('/'); // pega "blog/timestamp-filename"

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('Erro ao deletar imagem:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Erro ao deletar imagem:', err);
    return false;
  }
}
