import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus, ArrowClockwise, CheckCircle } from 'phosphor-react';

interface ImageBannerEditorProps {
  imageUrl: string;
  onRemove: () => void;
  onUpdate: (croppedImage: string) => void;
}

const ImageBannerEditor = ({ imageUrl, onRemove, onUpdate }: ImageBannerEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const originalImageRef = useRef<HTMLImageElement>(null);
  
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Dimensões do banner (ajuste conforme necessário)
  const BANNER_WIDTH = 1200; // Aumentado para melhor qualidade
  const BANNER_HEIGHT = 800; // Aumentado para melhor qualidade
  const PREVIEW_WIDTH = 300;
  const PREVIEW_HEIGHT = 200;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      originalImageRef.current = img;
      
      // Começar com zoom de forma que a imagem caiba perfeitamente no preview
      // Sem fazer zoom estranho
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
      redrawCanvas();
    };
    img.onerror = () => {
      console.error('Erro ao carregar imagem');
    };
    img.src = imageUrl;
  }, [imageUrl]);

  const redrawCanvas = () => {
    if (!canvasRef.current || !imageRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Limpar canvas com fundo branco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);

    const img = imageRef.current;
    
    // Desenhar imagem com offset e zoom
    ctx.save();
    
    // Mover para o centro
    ctx.translate(PREVIEW_WIDTH / 2, PREVIEW_HEIGHT / 2);
    
    // Aplicar zoom
    ctx.scale(zoom, zoom);
    
    // Aplicar offset
    ctx.translate(offsetX, offsetY);
    
    // Desenhar imagem centralizada
    ctx.drawImage(
      img,
      -img.width / 2,
      -img.height / 2,
      img.width,
      img.height
    );
    
    ctx.restore();

    // Desenhar moldura/guia do banner
    ctx.strokeStyle = '#9333ea';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, PREVIEW_WIDTH, PREVIEW_HEIGHT);
  };

  useEffect(() => {
    redrawCanvas();
  }, [zoom, offsetX, offsetY]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(3, zoom + delta));
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    // Calcular delta simples em pixels
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    // Dividir por zoom para manter movimento proporcional
    const scale = zoom > 0 ? zoom : 1;
    const movementX = deltaX / (scale * 1.5);
    const movementY = deltaY / (scale * 1.5);

    setOffsetX(offsetX + movementX);
    setOffsetY(offsetY + movementY);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleZoomIn = () => {
    setZoom(z => Math.min(3, z + 0.2));
  };

  const handleZoomOut = () => {
    setZoom(z => Math.max(0.5, z - 0.2));
  };

  const handleSave = () => {
    if (!imageRef.current) return;
    
    // Criar canvas com tamanho final do banner em alta resolução
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = BANNER_WIDTH;
    finalCanvas.height = BANNER_HEIGHT;
    const finalCtx = finalCanvas.getContext('2d');
    
    if (!finalCtx) return;

    // Desenhar fundo branco
    finalCtx.fillStyle = '#ffffff';
    finalCtx.fillRect(0, 0, BANNER_WIDTH, BANNER_HEIGHT);

    // Aplicar as mesmas transformações no tamanho maior
    finalCtx.save();
    
    // Usar a mesma proporção de zoom
    finalCtx.translate(BANNER_WIDTH / 2, BANNER_HEIGHT / 2);
    finalCtx.scale(zoom, zoom);
    finalCtx.translate(offsetX, offsetY);
    
    const img = imageRef.current;
    finalCtx.drawImage(
      img,
      -img.width / 2,
      -img.height / 2,
      img.width,
      img.height
    );
    
    finalCtx.restore();

    // Exportar com qualidade máxima
    const croppedImage = finalCanvas.toDataURL('image/jpeg', 0.95);
    onUpdate(croppedImage);
  };

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden border-2 border-purple bg-muted p-4">
        {/* Preview Canvas Container */}
        <div
          ref={containerRef}
          className="relative bg-white rounded-lg overflow-hidden"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <canvas
            ref={canvasRef}
            width={PREVIEW_WIDTH}
            height={PREVIEW_HEIGHT}
            className="w-full h-auto block"
            style={{ touchAction: 'none', display: 'block' }}
          />
          
          {/* Instruções */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/60 text-white text-xs px-3 py-2 rounded-lg text-center pointer-events-none backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              <span>🖱️ Arraste para mover</span>
              <span>•</span>
              <span>🔄 Scroll para zoom</span>
            </div>
          </div>
        </div>

        {/* Botão Fechar */}
        <motion.button
          onClick={onRemove}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors z-10 shadow-lg"
        >
          <X size={16} weight="regular" />
        </motion.button>
      </div>

      {/* Controles */}
      <div className="space-y-3">
        {/* Zoom Slider e Botões */}
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={handleZoomOut}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors"
            title="Diminuir zoom"
          >
            <Minus size={16} weight="regular" />
          </motion.button>

          <div className="flex-1 flex items-center gap-2">
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(zoom - 0.5) / 2.5 * 100}%, #e5e7eb ${(zoom - 0.5) / 2.5 * 100}%, #e5e7eb 100%)`
              }}
            />
            <span className="text-xs text-muted-foreground font-medium w-12 text-right">
              {(zoom * 100).toFixed(0)}%
            </span>
          </div>

          <motion.button
            type="button"
            onClick={handleZoomIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg border border-border/50 hover:bg-primary/5 transition-colors"
            title="Aumentar zoom"
          >
            <Plus size={16} weight="regular" />
          </motion.button>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-2">
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-4 py-2.5 bg-purple/20 hover:bg-purple/30 text-purple font-medium rounded-lg transition-colors border border-purple/30"
          title="Resetar zoom e posição"
        >
          <div className="flex items-center justify-center gap-2">
            <ArrowClockwise size={16} />
            Resetar
          </div>
        </motion.button>
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple to-purple/80 hover:from-purple/90 hover:to-purple/70 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
          title="Salvar imagem editada"
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle size={16} />
            Salvar Imagem
          </div>
        </motion.button>
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground bg-primary/5 rounded-lg p-3 border border-primary/20">
          <p className="font-medium text-primary mb-1">💡 Dica:</p>
          <p>Arraste a imagem para posicionar qual parte quer que apareça no banner. Use o scroll do mouse para aumentar ou diminuir o zoom.</p>
        </div>
      </div>
    </div>
  );
};

export default ImageBannerEditor;
