import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Plus, ArrowCounterClockwise } from 'phosphor-react';

interface ImageCropEditorProps {
  imageUrl: string;
  onSave: (croppedImage: string) => void;
  onCancel: () => void;
}

export default function ImageCropEditor({ imageUrl, onSave, onCancel }: ImageCropEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = imageUrl;
      }
      redrawCanvas();
    };
  }, [imageUrl]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current || !imgRef.current.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Define tamanho do canvas
    canvas.width = 600;
    canvas.height = 400;

    // Limpa canvas
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a imagem
    const img = imgRef.current;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.width / 2 + offsetX, -img.height / 2 + offsetY);
    ctx.restore();

    // Desenha moldura
    ctx.strokeStyle = '#6b5b95';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.setLineDash([]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = (e.clientX - dragStart.x) / scale;
    const deltaY = (e.clientY - dragStart.y) / scale;

    setOffsetX(offsetX + deltaX);
    setOffsetY(offsetY + deltaY);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    redrawCanvas();
  };

  useEffect(() => {
    redrawCanvas();
  }, [scale, offsetX, offsetY]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const croppedImage = canvas.toDataURL('image/png');
      onSave(croppedImage);
    }
  };

  const handleReset = () => {
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
    redrawCanvas();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <h2 className="text-xl font-bold text-foreground">Editar Imagem</h2>
          <motion.button
            onClick={onCancel}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} weight="regular" />
          </motion.button>
        </div>

        {/* Canvas */}
        <div className="p-6 space-y-4">
          <div className="bg-muted rounded-lg overflow-hidden border border-border/30">
            <canvas
              ref={canvasRef}
              className="w-full cursor-move"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <img ref={imgRef} className="hidden" alt="source" />
          </div>

          {/* Controles */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground w-20">Zoom:</span>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-12">{(scale * 100).toFixed(0)}%</span>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => setScale(Math.max(0.5, scale - 0.2))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
              >
                <Minus size={16} weight="regular" />
                Diminuir
              </motion.button>
              <motion.button
                onClick={() => setScale(Math.min(3, scale + 0.2))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
              >
                <Plus size={16} weight="regular" />
                Aumentar
              </motion.button>
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
              >
                <ArrowCounterClockwise size={16} weight="regular" />
                Resetar
              </motion.button>
            </div>

            <p className="text-xs text-muted-foreground">
              Dica: Arraste a imagem para posicioná-la dentro do quadro
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-border/30 bg-muted/30">
          <motion.button
            onClick={onCancel}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-2 border border-border/50 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Salvar Imagem
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
